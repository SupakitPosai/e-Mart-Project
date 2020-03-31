<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TypeProperty extends Model
{
    protected $table = 'type_property_product';
    protected $primaryKey = 'id_type_property';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
    //
}
