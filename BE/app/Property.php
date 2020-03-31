<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    //
    protected $table = 'property_product';
    protected $primaryKey = 'id_property';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
