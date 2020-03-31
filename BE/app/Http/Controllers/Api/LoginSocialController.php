<?php

namespace App\Http\Controllers\Api;
use App\Users;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginSocialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $Users = Users::where('id_facebook','=',$request->id_social)->first();
        if($Users == ''){
            $Users = Users::where('id_google','=',$request->id_social)->first();
            return $Users;
        }else{
           return $Users; 
        }
        
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
        $id_member = $this->setMD5();
        $users = new Users();
        $users->id = $id_member;
        $users->name_user = $request->get('name_user');       
        $users->email_user = $request->get('email_user');
        $users->type_user = "user";
        $users->img_path = $request->get('img_path');
        $users->id_facebook = $request->get('id_facebook');

        $users->save();
        return $users;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$id)
    {
        
        $id_member = $this->setMD5();
        $users = new Users();
        $users->id = $id_member;
        $users->name_user = $request->get('name_user');       
        $users->email_user = $request->get('email_user');
        $users->type_user = "user";
        $users->img_path = $request->get('img_path');
        $users->id_google = $request->get('id_google');

        $users->save();
       return $users;
      // return $request->get('name_user');
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
