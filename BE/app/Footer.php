<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Footer extends Model
{
    //
    protected $table = 'footer';
    protected $primaryKey = 'id_footer';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
