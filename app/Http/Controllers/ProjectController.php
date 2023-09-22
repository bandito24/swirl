<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProjectRequest;
use App\Models\Language;
use App\Models\Project;
use App\Models\ProjectLanguage;
use App\Models\ProjectRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function store(CreateProjectRequest $request){
        $project = null;
        DB::transaction(function () use ($request, &$project) {
//
            $attributes = $request->validated();

            $projectRoles = $attributes['projectRoles'];
            unset($attributes['projectRoles']);
            $projectLanguages = $attributes['projectLanguages'];
            unset($attributes['projectLanguages']);

            $project = Project::create($attributes);

            foreach ($projectRoles as $role) {
                ProjectRole::create([
                    'role'       => $role,
                    'project_id' => $project->id
                ]);
            }
            foreach($projectLanguages as $language){
                $languageModel = Language::where('name', $language)->first();
                ProjectLanguage::create([
                    'project_id' => $project->id,
                    'language_id' => $languageModel->id
                ]);
            }

            $project->load('roles');
            $project->load('languages');
        });
        return response(compact('project'));

    }
    public function index(){
        $projects = Project::orderBy('created_at', 'desc')->get();
        return response(compact('projects'));
    }
    public function show($slug){
        $project = Project::where('slug', $slug)->firstOrFail();
        $project->load('creator');
        $project->load('roles.user');

        return response(compact('project'));
    }

    public function indexByParameter(Request $request){
        $languages = $request['languages'] ?? null;
        $search = $request['search'] ?? null;



        $projects = Project::query();

        if ($languages && count($languages) > 0) {
            $projects->filterByLanguages($languages);
        }
        if ($search) {
            $projects->filterBySearch($search);
        }
            $projects = $projects->limit(100)
            ->paginate(25);

        return response(compact('projects'));
    }

    public function indexBySearch(Request $request){
        $search = $request['search'];



        $filteredProjects = Project::query()
        ->without(['roles', 'languages'])
        ->filterBySearch($search)
           ->get();

        $reducedProjects = $filteredProjects->take(15);

        return response(['status' =>'success',
        'filteredProjects' => $reducedProjects,
            'count' => $filteredProjects->count()
        ]);
    }

}
