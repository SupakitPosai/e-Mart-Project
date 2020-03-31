<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
