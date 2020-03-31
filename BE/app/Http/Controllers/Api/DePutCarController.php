<?php

namespace App\Http\Controllers\Api;
use App\Cart;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DePutCarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $cart = Cart::where('date_cart','=',$request->date_cart)
    
        ->where('id_product','=',$request->id_product)
        ->where('status','=','ยืนยัน')
        ->first();
        $cart->num_product =  $request->get('num_product');
       
         $cart->save();

         return $cart;
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
        //
        $cart = Cart::where('date_cart','=',$request->date_cart)
        ->where('id_product','=',$request->id_product)->first();
        $cart->status = "ยกเลิก";
        $cart->save();
        return response()->json('Users Deleted Successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$id)
    {
        //
        $cart = DB::table('cart')
        ->join('product', 'cart.id_product', '=', 'product.id_product')  
        ->join('shop', 'product.id_shop', '=', 'shop.id_shop')
        ->where('cart.id_user','=', $request->id_user)->where('cart.status','=','ยืนยัน')
        ->where('shop.id_shop','=',$request->id_shop)       
        ->select('cart.*','shop.id_shop','product.name_product'
        )
        ->get();
              

         return $cart;
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
         $cartAll_ID = Cart::where('id_user','=', $request->id_user)->where('status','=','ยืนยัน')->get();
        return $cartAll_ID;
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
}
