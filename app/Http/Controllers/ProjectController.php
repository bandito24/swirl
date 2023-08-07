<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProjectRequest;
use App\Models\Language;
use App\Models\Project;
use App\Models\Project_language;
use App\Models\Project_Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function create(CreateProjectRequest $request){
        $project = null;
        DB::transaction(function () use ($request, &$project) {
//
            $attributes = $request->validated();

            $project_roles = $attributes['project_roles'];
            unset($attributes['project_roles']);
            $project_languages = $attributes['project_languages'];
            unset($attributes['project_languages']);

            $project = Project::create($attributes);

            foreach ($project_roles as $role) {
                Project_Role::create([
                    'role'       => $role,
                    'project_id' => $project->id
                ]);
            }
            foreach($project_languages as $language){
                $languageModel = Language::where('name', $language)->first();
                Project_language::create([
                    'project_id' => $project->id,
                    'language_id' => $languageModel->id
                ]);
            }

            $project->load('roles');
            $project->load('languages');
        });
        return response(compact('project'));

    }
}
