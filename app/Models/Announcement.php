<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;
    protected $fillable = ['content','user_id'];
    public function files()
    {
        return $this->hasMany(ImagesUpload::class); // Adjust as per your model
    }
    public function user()
    {
        return $this->belongsTo(User::class,"user_id"); // Adjust as per your model
    }
    
}
