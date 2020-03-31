<?php

namespace App\Http\Controllers\Api;

use App\Users;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = Users::all();
        return response()->json($users);
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
        
        $date=date("Y-m-d_H-i-s");
        
        $img = str_replace('data:image/jpeg;base64,','',$request->get('file'));
        $img = str_replace(' ','+',$img);
        echo file_put_contents(storage_path()."/img_users/users-".$date.".jpg", base64_decode($img));

        $users = new Users();
        $users->id = $id_member;
        $users->name_user = $request->get('name_user');
        $users->card_number = $request->get('card_number');
        $users->username = $request->get('username');
        $users->password = $request->get('password');
        $users->email_user = $request->get('email_user');
        $users->tel_user = $request->get('tel_user');
        $users->type_user = $request->get('type_user');
        $users->date_birth = $request->get('date_birth');
        $users->img_path = "/img_users/users-".$date.".jpg";

        $users->save();
        return $users;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Users::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // return Users::find($id);
        $users = Users::find($id);
        return response()->json($users);
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


        // $users = Users::findOrFail($id);
        // $users->update($request->all());

        // return response()->json($users);
        if($request->get('file') != '' ){
            $img = str_replace('data:image/jpeg;base64,','',$request->get('file'));
            $img = str_replace(' ','+',$img);
            echo file_put_contents(storage_path().$request->get('img_name'), base64_decode($img));
        }
        $users = Users::find($id);
        $users->card_number = $request->get('card_number');
        $users->name_user = $request->get('name_user');
        $users->email_user = $request->get('email_user');
        $users->tel_user = $request->get('tel_user');
        $users->date_birth = $request->get('date_birth');
        $users->address_user = $request->get('address_user');
        $users->password = $request->get('password');
        $users->save();


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
        $users = Users::find($id);
        $users->delete();
  
  
        return response()->json('Users Deleted Successfully.');
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
