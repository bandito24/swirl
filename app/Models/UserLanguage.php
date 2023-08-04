<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserLanguage
 *
 * @property int $id
 * @property int $user_id
 * @property int $language_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\UserLanguageFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|UserLanguage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserLanguage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserLanguage query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserLanguage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLanguage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLanguage whereLanguageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLanguage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLanguage whereUserId($value)
 * @mixin \Eloquent
 */
class UserLanguage extends Model
{
    use HasFactory;


    protected $guarded = [];
}
