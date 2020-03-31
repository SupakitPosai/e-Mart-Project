<?php

namespace App\Http\Controllers\Api;
use App\OrderProduct;
use App\OrderProductDetail;
use App\Cart;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $OrderProduct = OrderProduct::where('id_user','=',$request->id_user)
        ->where('status','=','รอการชำระเงิน')
        ->get();   
         return count($OrderProduct);
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
         $OrderProductDetail = OrderProductDetail::where('id_shop','=',$request->id_shop)
        ->where('status_order_detail','=','รอการจัดส่ง')
        ->get();   
         return count($OrderProductDetail);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        //
        $cart = Cart::where('id_user','=',$request->id_user)       
        ->where('status','=','ยืนยัน')
        ->get();       

         return count($cart);
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
        $users = DB::table('cart') 
        ->join('product', 'cart.id_product', '=', 'product.id_product')         
        ->where('product.id_shop','=', $request->id_shop)->where('cart.id_user','=', $request->id_user)
        ->where('cart.status','=', 'ยืนยัน')
        ->update(['cart.delivery_method' => $request->delivery_method]);
        // ->select('product.name_product','cart.delivery_method')
        
        //  ->get();

        
       

        //
        return $users;

        //
        // $cart = Cart::where('date_cart','=',$request->date_cart)->first();
        // $cart->delivery_method = $request->get('delivery_method'); 
        // $cart->save();
        // return $cart;
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
        $OrderProduct = OrderProduct::where('status','=','รอการตรวจสอบ')       
        ->get(); 
        return count($OrderProduct);
    }
}
