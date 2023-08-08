<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Language;
use App\Models\Project;
use App\Models\ProjectLanguage;
use App\Models\ProjectRole;
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


        foreach ($languages as $lang) {
            if($lang !== "C++") Str::slug($lang);
            $language = Language::factory()->create([
                'name' => $lang,
                'slug' => $lang
            ]);
            for ($i = 0; $i < 50; $i++) {
                $userLanguage = UserLanguage::factory()->create([
                    'language_id' => $language->id,
                    'user_id'     => User::factory()->create()
                ]);

                $project = Project::factory()->create([
                    'creator_id' => $userLanguage->user_id
                ]);

                $projectLanguages = [];

                while(count($projectLanguages) < 3){
//                $randomLanguage = Language::inRandomOrder()->first();
                $randomLanguage = rand(1, count($languages));
                if(!in_array($randomLanguage, $projectLanguages)){
                    $projectLanguage = ProjectLanguage::factory()->create([
                        'project_id' => $project->id,
                        'language_id' => $randomLanguage
                    ]);
                    $projectLanguages[] = $randomLanguage;
                }
                }

                for ($j = 0; $j < 4; $j++) {
                    $randomUserId = User::inRandomOrder()->first()->id;
                    if($randomUserId && $j < 3) {
                        ProjectRole::factory()->create([
                            'project_id' => $project->id,
                            'user_id'    => $randomUserId
                        ]);
                    } else if($randomUserId){
                        ProjectRole::factory()->create([
                            'project_id' => $project->id,
                        ]);
                    }
                }
            }
        }
//        $randLanguage = rand(1, count($languages));
//
//
//                }

//        for($i = 0; $i < 100; $i++){
//            $randLanguage = rand(1, count($languages));
//            UserLanguage::factory()->create([
//                'language_id' => $randLanguage,
//                'user_id' => User::factory()
//            ]);
//        }


    }
}
