<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    protected $table = 'shop';
    protected $primaryKey = 'id_shop';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
