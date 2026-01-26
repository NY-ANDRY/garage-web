<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Table Clients
        Schema::create('clients', function (Blueprint $table) {
            $table->string('uid')->primary();
            $table->string('email')->unique();
            $table->string('displayName');
            $table->string('photoURL')->nullable();
            $table->timestamps();
        });

        // 2. Table Voiture
        Schema::create('voiture', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('uid_client');
            $table->string('numero');
            $table->string('nom');
            $table->text('description')->nullable();
            $table->string('url_img')->nullable();
            $table->string('couleur')->nullable();
            $table->string('couleurHex')->nullable();
            $table->string('marque')->nullable();
            $table->timestamp('année')->nullable();
            $table->timestamps();

            $table->foreign('uid_client')->references('uid')->on('clients')->onDelete('cascade');
        });

        // 3. Table Interventions (Must be before reparation_interventions)
        Schema::create('interventions', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->decimal('prix', 10, 2);
            $table->decimal('duree'); // durée en minutes
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // 4. Table Réparations
        Schema::create('reparations', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('uid_client');
            $table->string('id_voiture');
            $table->timestamp('date')->useCurrent();
            $table->timestamps();

            $table->foreign('uid_client')->references('uid')->on('clients')->onDelete('cascade');
            $table->foreign('id_voiture')->references('id')->on('voiture')->onDelete('cascade');
        });

        // 5. Table Statut
        Schema::create('statut', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('uid_client');
            $table->string('id_voiture');
            $table->timestamp('date')->useCurrent();
            $table->timestamps();

            $table->foreign('uid_client')->references('uid')->on('clients')->onDelete('cascade');
            $table->foreign('id_voiture')->references('id')->on('voiture')->onDelete('cascade');
        });

        // 6. Table Réparations_Statut
        Schema::create('reparations_statut', function (Blueprint $table) {
            $table->id();
            $table->string('id_reparation');
            $table->string('id_statut');
            $table->timestamp('date')->useCurrent();
            $table->timestamps();

            $table->foreign('id_reparation')->references('id')->on('reparations')->onDelete('cascade');
            $table->foreign('id_statut')->references('id')->on('statut')->onDelete('cascade');
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
            $table->string('id')->primary();
            $table->string('id_reparation');
            $table->decimal('montant', 10, 2);
            $table->timestamp('date')->useCurrent();
            $table->timestamps();

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
        Schema::dropIfExists('reparations_statut');
        Schema::dropIfExists('statut');
        Schema::dropIfExists('reparations');
        Schema::dropIfExists('interventions');
        Schema::dropIfExists('voiture');
        Schema::dropIfExists('clients');
    }
};
