<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagesUpload extends Model
{
    use HasFactory;
    protected $table="files";
    protected $fillable = ['announcement_id', 'file_path']; // Make sure to fill in the fillable fields

    public function announcement()
    {
        return $this->belongsTo(Announcement::class, 'announcement_id');
    } 
    
}
