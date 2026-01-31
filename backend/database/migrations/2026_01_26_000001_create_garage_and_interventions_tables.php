<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Table Clients
        Schema::create('clients', function (Blueprint $table) {
            $table->string('uid')->primary();
            $table->string('email')->unique()->nullable();
            $table->string('displayName')->nullable();
            $table->string('photoURL')->nullable();
            $table->string('fcmToken')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // 2. Table Voiture
        Schema::create('voitures', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('uid_client')->nullable();
            $table->string('numero')->nullable();
            $table->string('nom')->nullable();
            $table->text('description')->nullable();
            $table->string('url_img')->nullable();
            // $table->string('couleur')->nullable();
            $table->string('couleurHex')->nullable();
            $table->string('marque')->nullable();
            $table->string('annee')->nullable();
            $table->timestamps();
            $table->softDeletes();
            // $table->foreign('uid_client')->references('uid')->on('clients')->nullOnDelete();
        });

        // 3. Table Interventions (Must be before reparation_interventions)
        Schema::create('interventions', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->decimal('prix', 10, 2);
            $table->decimal('duree'); // durée en minutes
            $table->string('image')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // 4. Table Réparations
        Schema::create('reparations', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('uid_client');
            $table->string('id_voiture');
            $table->timestamp('date')->useCurrent();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('uid_client')->references('uid')->on('clients')->nullOnDelete();
            $table->foreign('id_voiture')->references('id')->on('voitures')->nullOnDelete();
        });

        // 5. Table Statut
        Schema::create('statuts_reparations', function (Blueprint $table) {
            $table->id('id')->primary();
            $table->timestamp('date')->useCurrent();
            $table->timestamps();
            $table->softDeletes();
        });

        // 6. Table Réparations_Statut
        Schema::create('reparations_statuts', function (Blueprint $table) {
            $table->id();
            $table->string('id_reparation');
            $table->integer('id_statut');
            $table->timestamp('date')->useCurrent();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('id_reparation')->references('id')->on('reparations')->onDelete('cascade');
            $table->foreign('id_statut')->references('id')->on('statuts_reparations')->onDelete('cascade');
        });

        // 7. Table Réparation_Interventions
        Schema::create('reparation_interventions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_intervention');
            $table->string('id_reparation');
            $table->decimal('prix', 10, 2);
            $table->decimal('duree', 8, 2);
            $table->timestamp('date')->useCurrent();
            $table->timestamps();
            $table->foreign('id_reparation')->references('id')->on('reparations')->onDelete('cascade');
            $table->foreign('id_intervention')->references('id')->on('interventions')->onDelete('cascade');
        });

        // 8. Table Paiement
        Schema::create('paiement', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('id_reparation');
            $table->decimal('montant', 10, 2);
            $table->timestamp('date')->useCurrent();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('id_reparation')->references('id')->on('reparations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiement');
        Schema::dropIfExists('reparation_interventions');
        Schema::dropIfExists('reparations_statuts');
        Schema::dropIfExists('statuts_reparations');
        Schema::dropIfExists('reparations');
        Schema::dropIfExists('interventions');
        Schema::dropIfExists('voitures');
        Schema::dropIfExists('clients');
    }
};
