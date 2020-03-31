<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    //
    protected $table = 'order_product';
    protected $primaryKey = 'id_order';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
