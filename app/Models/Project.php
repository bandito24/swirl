<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $with = ['roles', 'languages'];

    public function roles(){
        return $this->hasMany(Project_Role::class, 'project_id');
    }
    public function languages(){
        return $this->belongsToMany(Language::class, 'project_languages', 'project_id', 'language_id');
    }
}
