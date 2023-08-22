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


//    protected $dates = [
//        'created_at',
//        'updated_at',
//        // your other new column
//    ];

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
    public function scopeFilterByLanguages($query, $languages){
        return $query->whereHas('languages', fn($subQuery)=>
//        $subQuery->whereIn('slug', $languages->pluck('slug'))
        $subQuery->whereIn('slug', $languages)
        );
    }


    protected static function booted(){
        static::creating(function ($project) {
            $project->slug = Str::slug($project->project_name);
        });
    }
}
