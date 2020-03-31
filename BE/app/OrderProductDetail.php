<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderProductDetail extends Model
{
    //
    protected $table = 'order_product_detail';
    protected $primaryKey = 'id_order';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
