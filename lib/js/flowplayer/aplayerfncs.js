
var fp_uicontrol_handler = {

	timer : {},
		
	setTimer : function(ElNum){
		var self = this;
		self.timer[ElNum] = setInterval( function(){
				self.playbackInProgress(ElNum);
	    	}, 333); 
	},
	
	playbackInProgress : function(ElNum){
		var self = this;
		self.updateCurTime(ElNum);
		self.updateSearchSliderPosition(ElNum);
	},
	
	updateCurTime : function(ElNum){
		var self = this;
		var cur_t = $f($.aplayer.idContainer+ElNum ).getTime();
		var tCur = Math.round(cur_t);
		var tCurStr = self.FormatTime(tCur);
		$('#'+$.aplayer.idCurrentTime+ElNum).html(tCurStr);
	},
	
	
	updateSearchSliderPosition : function(ElNum){
		var self = this;
		if($('#'+$.aplayer.idSearch+ElNum).attr('isPlaying')!= undefined) return;
		
		var MediaElt = $f($.aplayer.idContainer+ElNum );
		if(MediaElt==undefined) return;
		var cur_t =  MediaElt.getTime() ;
		$('#'+$.aplayer.idSearch+ElNum).slider('value', cur_t*30 );
	},
	
	
	updateDuration : function(ElNum){
		var self = this;
		var tDur = Math.round( $f($.aplayer.idContainer+ElNum).getClip().fullDuration );
		var tDurStr = self.FormatTime(tDur);
        $('#'+$.aplayer.idDuration+ElNum).html(tDurStr);
		$('#'+$.aplayer.idSearch+ElNum).slider({'max': (tDur-1)*30 });
	},
	
    //формирование строки времени
    FormatTime : function(Seconds){
        return  (
        		Math.floor(Seconds/(60*60)))+':'
        		+((Math.floor(Seconds/60)%60)<10? '0'+(Math.floor(Seconds/60)%60):(Math.floor(Seconds/60)%60))+':'
        		+(Math.floor(Seconds%60)<10? '0'+Math.floor(Seconds%60):Math.floor(Seconds%60));
    },
	
		
	//Обработчики пользовательских событий aplayera для flowplayer
	elMediaOnResume :function(ElNum){
		var self = this;
		$('#'+$.aplayer.idPlay+ElNum).hide();
		$('#'+$.aplayer.idPause+ElNum).show();
		self.setTimer(ElNum);
	},

	elMediaOnPlay:function(ElNum){
		var self = this;
		$('#'+$.aplayer.idPlay+ElNum).hide();
		$('#'+$.aplayer.idPause+ElNum).show();
		self.updateDuration(ElNum);
		self.setTimer(ElNum);
	},
			
	elMediaOnPause:function(ElNum){
		this.noPlay(ElNum);
	},
			
	elMediaOnFinish : function(ElNum){
		this.noPlay(ElNum);
	},
			
	elMediaOnStop : function(ElNum){
		this.noPlay(ElNum);

		//обнуляем слайдер и текущее время
		var tCurStr = $.aplayer.ControlBar.FormatTime(0);
		$('#'+$.aplayer.idCurrentTime+ElNum).html(tCurStr);
		$('#'+$.aplayer.idSearch+ElNum).slider('value', 0 );
	},
			
	noPlay : function(ElNum){
		var self = this;
		$('#'+$.aplayer.idPlay+ElNum).show();
		$('#'+$.aplayer.idPause+ElNum).hide();
		clearInterval(self.timer[ElNum]);
		self.updateCurTime(ElNum);
	},

	
	elMediaOnBeforeClick : function(ElNum){
		var self = this;
		var player = $f($.aplayer.idContainer+ElNum);		
		
		
		
	},
	
	//dag and drop for flowplayer
	drag_n_drop : {
		//кординаты мыши
		curX:0,
		curY:0,
		
		//смещение мыши
		dX:0,
		dY:0,
		
		//позиция флоуплеера
		fpX:0,
		fpY:0,
		
		sub_cont:{}, //субконтейнер аплеера для флоуплеера
		fp_obj:{}, //внедреный объект
		
		init : function(mouse_evt, ElNum){
			var self =this;
			var fp_obj = $('#'+$.aplayer.idContainer+ElNum+'_api');
			var player = $f($.aplayer.idContainer+ElNum);
			
			self.fp_obj = fp_obj;
			self.sub_cont = $('#'+$.aplayer.idContainer+ElNum+' .'+$.aplayer.classMediaCont);
			
			$(fp_obj).css({'position':'absolute' });
			
			self.curX = mouse_evt.clientX;
			self.curY = mouse_evt.clientY;

			//определяем текущую позицию фп-плеера
			self.fpX = ( isNaN(parseInt($(fp_obj).css('left'))) )? 0: parseInt($(fp_obj).css('left')) ;
			self.fpY = ( isNaN(parseInt($(fp_obj).css('top')))  )? 0: parseInt($(fp_obj).css('top')) ;
		
			//устанавливаем обработчик перетаскивания
	        $(self.sub_cont).bind('mousemove', function(e) {
	        	//левая кнопка мыши 
				if(e.button==0){
					//обработчик перемщения мыши при перетаскивании
					self.drag(e, ElNum);
				}
        	});
		},

		drop : function(mouse_evt, ElNum){
			var self =this;
			//отключение обработчика перемщения мыши при перетаскивании
			$(self.sub_cont).unbind('mousemove');
		},
		
		drag : function(mouse_evt, ElNum){
			var self =this;
			
			self.dX = self.curX - mouse_evt.clientX;
			self.dY = self.curY - mouse_evt.clientY;
			
			self.curX = mouse_evt.clientX;
			self.curY = mouse_evt.clientY;
			
			self.fpX -= self.dX;
			self.fpY -= self.dY;
			
			//проверка допустимости перетаскивания
			//размеры флоуплеера
			var fp_h = $(self.fp_obj).height();
			var fp_w = $(self.fp_obj).width();
			//размеры субконтейнера
			var sub_h = $(self.sub_cont).height();
			var sub_w = $(self.sub_cont).width();
			//привязка к верхней границе субконтейнера
			if(self.fpY>0) self.fpY = 0;
			//привязка к левой границе субконтейнера
			if(self.fpX>0) self.fpX = 0;
			//привязка к нижней границе субконтейнера
			if(sub_w  <= fp_w && sub_h > fp_h + self.fpY  ) self.fpY = sub_h - fp_h;
			//привязка к правой границе субконтейнера
			if(sub_w  <= fp_w && sub_w > fp_w + self.fpX  ) self.fpX = sub_w - fp_w;

			//установка текущей позиции
			$(self.fp_obj)
				.css({
					'left':self.fpX+'px',
					'top': self.fpY+'px'
				});
			
		}
	},
	
	
	
	onPlayerLoaded : function(ElNum){
		var self = this;
		var player = $f($.aplayer.idContainer+ElNum);
		
		//dragg and drop
		$('#'+$.aplayer.idContainer+ElNum+' .'+$.aplayer.classMediaCont)
		.mousedown(function(e) {
        	//левая кнопка мыши 
			if(e.button==0){
				self.drag_n_drop.init(e, ElNum);
			}
    	});
		
        //обработчик mouseup
        $(document).bind('mouseup', function(e) {
        	//левая кнопка мыши 
			if(e.button==0){
				self.drag_n_drop.drop(e, ElNum);
			}
    	});
		
	},
	
	
	onClipBegin : function(ElNum){
		var self = this;
		var player = $f($.aplayer.idContainer+ElNum);
	},


    //Обработчики событий контролов
	
	soundOnClickHandler: function(ElNum){
		var self = this;
		var player = $f($.aplayer.idContainer+ElNum);
		player.unmute();

		//$('#'+$.aplayer.idElMedia+ElNum).each(function(){ this.muted=false; });
		$('#'+$.aplayer.idSoundOff+ElNum).show();
		$('#'+$.aplayer.idSoundOn+ElNum).hide();
	},

	soundOffClickHandler : function(ElNum){
		var self = this;
		var player = $f($.aplayer.idContainer+ElNum);
		player.mute();
		$('#'+$.aplayer.idSoundOff+ElNum).hide();
		$('#'+$.aplayer.idSoundOn+ElNum).show();
	},

	//Слайдер звука
	volumeSlideHandler : function(Elem){
		var self = this;
		var ElNum = $(Elem).attr('No');
		var player = $f($.aplayer.idContainer+ElNum);
		var vol = Math.round(($(Elem).slider('value')/40)*100) ;
		if (vol<0) vol =0;
		if (vol>100)vol = 100;
		player.setVolume(vol);
	},

    volumeStopHandler : function(Elem){
    	var self = this;
		var ElNum = $(Elem).attr('No');
		var player = $f($.aplayer.idContainer+ElNum);  	
    },
	
    //воспроизведение
    playClickHandler : function(ElNum){
	     var self = this;
	     if($f($.aplayer.idContainer+ElNum ).isPaused()){
	    	 $f($.aplayer.idContainer+ElNum ).resume();
	     }
	     else{
	    	 $f($.aplayer.idContainer+ElNum ).play();
	     }
    },

    //пауза
    pauseClickHandler : function(ElNum){
    	$f($.aplayer.idContainer+ElNum ).pause();
    },

    //стоп
	stopClickHandler : function(ElNum){
		var self = this;
		$f($.aplayer.idContainer+ElNum).stop();
    },

    //слайдер поиска по времени
	searchOnStartHandler : function(Elem){
		var self = this;
		var ElNum = $(Elem).attr('No');
		var player = $f($.aplayer.idContainer+ElNum);

		if( player.isPlaying() ){
			$(Elem).attr({'isPlaying':'true'});
			player.pause();
		}else{
			$(Elem).attr({'isPlaying':'true'});
		}
		
		//если файл не загружен - запускаем воспроизведение
		if(player.getStatus()['bufferEnd']==0 && player.getState()!=2 ){ 
			player.play();
		}
	},


	searchOnStopHandler : function(Elem){
		var self = this;
		var ElNum = $(Elem).attr('No');
		var player = $f($.aplayer.idContainer+ElNum);
		
		//если в буфере пусто
		if(player.getStatus()['bufferEnd']==0){ 
			//возвращаем слайдер на наачальную позицию
			$('#'+$.aplayer.idSearch+ElNum).slider('value', 0);
			return;
		}
		
		var setTime = Math.round(($(Elem).slider('value'))/30);
		
		var tCurStr = self.FormatTime(setTime);
		$('#'+$.aplayer.idCurrentTime+ElNum).html(tCurStr);
		
		player.seek(setTime);
		
		if($(Elem).attr('isPlaying')=='true'){
//			player.resume();
			self.playClickHandler(ElNum);
		}
		$(Elem).removeAttr('isPlaying');

	},

	searchOnSlideHandler : function(Elem){
		var self = this;
		var ElNum = $(Elem).attr('No');
		var player = $f($.aplayer.idContainer+ElNum);

		//если в буфере пусто
		if(player.getStatus()['bufferEnd']==0){ 
			return;
		}
		
		var setTime = Math.round(($(Elem).slider('value'))/30);
		var tCurStr = $.aplayer.ControlBar.FormatTime(setTime);
		$('#'+$.aplayer.idCurrentTime+ElNum).html(tCurStr);

		player.seek(setTime);
	},
            
            
            
            
            //Обработчик клика кнопок масштаба
	scaleClickHandler : function(e){
		var btn = $(e.target);
		//плеер
		var plNo = $(e.target).parent().attr('id').replace($.aplayer.idScale, '');
		var cur_player = $('#'+$.aplayer.idContainer+plNo);
		var width = $(cur_player).width();
		var height = $(cur_player).height();
		//медиа элемент
		var me = $('#'+$.aplayer.idContainer+plNo+'_api');
		var me_width = $(me).width();
		var me_height = $(me).height();
		
		// шаг увеличения размерa
		var wm = width*$.aplayer.scaleFactor;
		var hm = height*$.aplayer.scaleFactor;

		
		if($(btn).hasClass('increase')){
			//если +
			me_width+=wm;
			me_height+=hm;
		}else{
			//если -
			me_width-=wm;
			me_height-=hm;
		}
				
		//Изменение размеров медиа-элемента плеера 
		$(cur_player).parent().aplayerSetSizeMediaElt({
			'width':  me_width +'px',
			'height': me_height+'px'
		} );
				
		if(me_width<=width){
			$(me).css({'left':'0px'});
		}
		if(me_height<=height){
			$(me).css({'top':'0px'});
		}
	},
            
}