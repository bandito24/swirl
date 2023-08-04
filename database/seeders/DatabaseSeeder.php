<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Language;
use App\Models\User;
use App\Models\UserLanguage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder

{

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $languages = [
            "C++",
            "C",
            "CSS",
            "Go",
            "HTML",
            "Java",
            "JavaScript",
            "Kotlin",
            "Matlab",
            "NoSQL",
            "Perl",
            "PHP",
            "Python",
            "R",
            "Ruby",
            "Rust",
            "Scala",
            "SQL",
            "Swift",
            "TypeScript",
        ];


        foreach($languages as $lang){
            if($lang !== "C++") Str::slug($lang);
            Language::factory()->create([
                'name' => $lang,
                'slug' => $lang
            ]);
        }
        $randLanguage = rand(1, count($languages));

        for($i = 0; $i < 100; $i++){
            $randLanguage = rand(1, count($languages));
            UserLanguage::factory()->create([
                'language_id' => $randLanguage,
                'user_id' => User::factory()
            ]);
        }







    }
}
