<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderProductDetail1 extends Model
{
    //
    protected $table = 'order_product_detail';
    protected $primaryKey = 'id_product';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
