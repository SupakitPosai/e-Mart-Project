<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    //
    protected $table = 'follow';
    protected $primaryKey = 'date_follow';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';

}
