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
        Schema::create('synchronisations', function (Blueprint $table) {
            $table->id();
            $table->string('source')->default('firebase');
            $table->timestamp('synchronised_at')->useCurrent();
            $table->timestamps();
        });

        // 2. Ajout de la référence dans clients
        Schema::table('clients', function (Blueprint $table) {
            $table->foreignId('synchronisation_id')
                ->nullable()
                ->after('photoURL')
                ->constrained('synchronisations')
                ->nullOnDelete();
        });

        // 3. Ajout de la référence dans voiture
        Schema::table('voiture', function (Blueprint $table) {
            $table->foreignId('synchronisation_id')
                ->nullable()
                ->after('uid_client')
                ->constrained('synchronisations')
                ->nullOnDelete();
        });

        // 4. Ajout de la référence dans reparations
        Schema::table('reparations', function (Blueprint $table) {
            $table->foreignId('synchronisation_id')
                ->nullable()
                ->after('id_voiture')
                ->constrained('synchronisations')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->dropForeign(['synchronisation_id']);
            $table->dropColumn('synchronisation_id');
        });

        Schema::table('voiture', function (Blueprint $table) {
            $table->dropForeign(['synchronisation_id']);
            $table->dropColumn('synchronisation_id');
        });

        Schema::table('reparations', function (Blueprint $table) {
            $table->dropForeign(['synchronisation_id']);
            $table->dropColumn('synchronisation_id');
        });

        Schema::dropIfExists('synchronisations');
    }
};
