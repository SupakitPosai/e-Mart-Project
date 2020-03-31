<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';
    protected $primaryKey = 'id_product';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
