console.log('manifest :-)');
// <link rel="stylesheet" href="http://twitter.github.com/bootstrap/assets/css/bootstrap-1.0.0.min.css">


manifest=function(x,opt){
	if(opt==='assemble methods'){ // do so, see below which are those
		for(i in x){manifest[i]=x[i]}
	}
	else if(typeof(x)==='string'){ // this is a url
		this.loadModule(x);
	}
	else if(typeof(x)==='object'){ // this is a manifest
		if (typeof(x.url)==='string'){ // this is an individual manifest
			manifest.manifests[x.url]=x; // register it
			this.loadModule(x.url); // and load it
		}
		else{ // this is an author manifest
			
		}
		
		//for(i in x){manifest.manifests[i]=x[i]} // record them all
		
	}
	else{
		console.log('dev me pls ;-) ')
	}
	
};

manifest({
	
	
load:function(url,cb,er){ // load script / JSON
	var s = document.createElement('script');
	s.src=url;
	s.id = this.uid();
	if(cb){s.onload=cb}
	if(er){s.onerror=er}
	document.body.appendChild(s);
	setTimeout('document.body.removeChild(document.getElementById("'+s.id+'"));',30000); // is the waiting still needed ?
	return s.id
},

loadModule:function(url,cb){
	if(!this.modules[url]){ // load only in not there already
		this.modules[url]={}; // register loading from this url
		this.load(url,cb);
		this.msg('loading '+url);
	}
	else{this.msg('module @ '+url+' already loaded')}
},

modules:[],
manifests:[],

uid:function(prefix){
	if(!prefix){prefix='UID'}
	var uid=prefix+Math.random().toString().slice(2);
	return uid
},


},'assemble methods')