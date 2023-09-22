<?php

namespace App\Models;

use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $with = ['roles', 'languages'];



    public function getCreatedAtAttribute($value)
    {
        $date = Carbon::parse($value);
        return $date->diffForHumans();
    }

    public function roles(){
        return $this->hasMany(ProjectRole::class, 'project_id');
    }
    public function creator(){
        return $this->belongsTo(User::class, 'creator_id');
    }
    public function languages(){
        return $this->belongsToMany(Language::class, 'project_languages', 'project_id', 'language_id');
    }
    public function scopeFilterByLanguages($query, $languages, $search = null){
        return $query->without(['roles'])
        ->whereHas('languages', fn($subQuery)=>
        $subQuery->whereIn('slug', $languages)
        );
    }
    public function scopeFilterBySearch($query, $search){
        return $query->where('project_name', 'REGEXP', '(^|\s)' . $search);
    }


    protected static function booted(){
        static::creating(function ($project) {
            $project->slug = Str::slug($project->project_name);
        });
    }
}
