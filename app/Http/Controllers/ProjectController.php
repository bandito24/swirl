<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function create(CreateProjectRequest $request){
        $project_roles = $request['project_roles'];
        $project_languages = $request['project_languages'];
        unset($request['project_roles'], $request['project_languages'])

//            $attributes

        $attributes = $request->validated();


        $project = Project::create($attributes);

        return response(compact('project'));

    }
}
