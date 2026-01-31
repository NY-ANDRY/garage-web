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

        // 1. Table des synchronisations Firebase
        Schema::create('sources', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();

            $table->softDeletes();
        });

        // 1. Table des synchronisations Firebase
        Schema::create('synchronisations', function (Blueprint $table) {
            $table->id();
            $table->integer('id_source');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('id_source')->references('id')->on('sources')->restrictOnDelete();
        });

        Schema::create('statut_sync', function (Blueprint $table) {
            $table->id();
            $table->string('statut');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('sync_statuts', function (Blueprint $table) {
            $table->id();
            $table->integer('id_sync');
            $table->integer('id_statut');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('id_sync')->references('id')->on('synchronisations')->restrictOnDelete();
            $table->foreign('id_statut')->references('id')->on('statut_sync')->restrictOnDelete();
        });

        Schema::create('sync_clients', function (Blueprint $table) {
            $table->id();
            $table->integer('id_sync');
            $table->string('uid');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('id_sync')->references('id')->on('synchronisations')->restrictOnDelete();
            $table->foreign('uid')->references('uid')->on('clients')->restrictOnDelete();
        });

        Schema::create('sync_voitures', function (Blueprint $table) {
            $table->id();
            $table->integer('id_sync');
            $table->string('id_voiture');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('id_sync')->references('id')->on('synchronisations')->restrictOnDelete();
            $table->foreign('id_voiture')->references('id')->on('voitures')->restrictOnDelete();
        });

        Schema::create('sync_reparations', function (Blueprint $table) {
            $table->id();
            $table->integer('id_sync');
            $table->string('id_reparation');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('id_sync')->references('id')->on('synchronisations')->restrictOnDelete();
            $table->foreign('id_reparation')->references('id')->on('reparations')->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sync_reparations');
        Schema::dropIfExists('sync_voitures');
        Schema::dropIfExists('sync_clients');
        Schema::dropIfExists('sync_statuts');
        Schema::dropIfExists('statut_sync');
        Schema::dropIfExists('synchronisations');
        Schema::dropIfExists('sources');
    }
};
