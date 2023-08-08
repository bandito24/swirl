<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $with = ['roles', 'languages'];

    public function roles(){
        return $this->hasMany(ProjectRole::class, 'project_id');
    }
    public function creator(){
        return $this->belongsTo(User::class, 'creator_id');
    }
    public function languages(){
        return $this->belongsToMany(Language::class, 'project_languages', 'project_id', 'language_id');
    }
    protected static function booted(){
        static::creating(function ($project) {
            $project->slug = Str::slug($project->project_name);
        });
    }
}
