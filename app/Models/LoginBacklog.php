<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model; 
class LoginBacklog extends Model
{
    use HasFactory;
    protected $fillable = ['school_id','login_time']; 
    public function user()
    {
        return $this->belongsTo(User::class, 'school_id');
    }

}
