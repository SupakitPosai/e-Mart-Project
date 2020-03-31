<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TypeProduct extends Model
{
    protected $table = 'type_product';
    protected $primaryKey = 'id_type';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
