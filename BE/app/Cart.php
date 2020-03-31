<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    //
    protected $table = 'cart';
    protected $primaryKey = 'date_cart';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
