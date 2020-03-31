<?php

namespace App\Http\Controllers\Api;
use App\OrderProduct;
use App\Footer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class GetOrderStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $users = DB::table('order_product')
         ->select('order_product.num_id','order_product.date_order','order_product.total_order'
        ,'payment_method.name_payment_method','users.name_user','order_product.status','order_product.id_order',
        'notify_payment.image_notify_pay','notify_payment.date_notify_pay')
        ->join('payment_method', 'order_product.id_payment_method', '=', 'payment_method.id_payment_method')    
        ->join('users', 'order_product.id_user', '=', 'users.id')
        ->join('notify_payment', 'order_product.id_order', '=', 'notify_payment.id_order')
        ->where('order_product.status','=', 'รอการตรวจสอบ')
       ->get();
        
        return $users;

        // $OrderProduct = OrderProduct::where('status','=', 'รอการตรวจสอบ')->get();
        
        // return $OrderProduct;
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
        return Footer::find($id);
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
        $Footer = Footer::find($id);
        $Footer->value_footer = $request->get('value_footer');
        $Footer->save();


        return response()->json('Footer Updated Successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    {
        //
        return  Footer::where('name_footer','=',$request->name)->get();
    }
}
