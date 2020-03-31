<?php

namespace App\Http\Controllers\Api;
use App\OrderProduct;
use App\OrderProductDetail;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class OrderProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $OrderProduct = OrderProduct::where('id_user','=', $request->id_user)->where('date_order' , '=',$request->date_order)->get();
        
        return $OrderProduct;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $id_member = $this->setMD5();
        //
        $orderProduct = new OrderProduct();
        $orderProduct->id_order=$id_member;
        $orderProduct->date_order = $request->get('date_order');
        $orderProduct->total_order = $request->get('total_order');
        $orderProduct->id_payment_method = $request->get('id_payment_method');
        $orderProduct->id_user = $request->get('id_user');
        $orderProduct->status = $request->get('status');
        $orderProduct->num_id = $request->get('num_id');

        $orderProduct->save();
        return $orderProduct;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $OrderProduct = OrderProduct::find($id);
        $OrderProduct->status = "รอการตรวจสอบ";
        
        $OrderProduct->save();

        $OrderProductDetail =  OrderProductDetail::find($id);
        $OrderProductDetail->status_order_detail = "รอการตรวจสอบ";
        
        $OrderProductDetail->save();


        return response()->json('Users Updated Successfully.');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function setMD5(){

        $passuniq = uniqid();
        $passmd5 = md5($passuniq);
    
        $sumlenght = strlen($passmd5);#num passmd5
    
        $letter_pre = chr(rand(97,122));#set char for prefix
    
        $letter_post = chr(rand(97,122));#set char for postfix
    
        $letter_mid = chr(rand(97,122));#set char for middle string
    
        $num_rand = rand(0,$sumlenght);#random for cut passmd5
    
        $cut_pre = substr($passmd5,0,$num_rand);#cutmd5 start 0 stop $numrand
        $setmid = $cut_pre.$letter_mid;#set pre string + char middle
    
        $cut_post = substr($passmd5,$num_rand, $sumlenght+1);
    
        $set_modify_md5 = $letter_pre.$setmid.$cut_post.$letter_post;
        return $set_modify_md5;
    
       }
}
