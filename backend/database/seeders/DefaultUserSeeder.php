<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DefaultUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'abc@gmail.com'],
            [
                'name' => 'abc',
                'password' => \Illuminate\Support\Facades\Hash::make('abcabcabc'),
            ]
        );
    }
}
