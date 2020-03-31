<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DeliveryMethod extends Model
{
    //
    protected $table = 'delivery_method';
    protected $primaryKey = 'id_delivery_method';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
