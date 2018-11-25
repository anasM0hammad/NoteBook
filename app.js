 App.controller('home', function (page) {
    

      });





       App.controller('notes', function (page) {
      
        
        if(JSON.parse(localStorage.getItem('subject')) !== null){

           var subject = JSON.parse(localStorage.getItem('subject'));
           
      
           if(localStorage.getItem('notes')!==null){
            var notes = JSON.parse(localStorage.getItem('notes')) ;
           }
         
            $.each(subject , function(index , value){
             
             $(page).find('#all_notes').append('<li class="app-button redirect" style="text-align:center;">'+ value +'</li>');

           });

             $(page).find('#all_notes').show();


             $(page).find(".redirect").clickable().on('click' , function(){

               localStorage.setItem('current_note' , $(this).index());

               App.load('read');

             });



        }
  
      });






        App.controller('write', function (page) {
         
         $(page).find('#save_note').clickable().on('click' , function(){

           //EMPTY INPUT
           if($('#subject').val() == ''){
                  App.dialog({
                  title        : 'Please Enter The Subject',
                  text         : 'Subject Form Can not be Empty',
                  okButton     : 'Try Again',
                  cancelButton : 'Back'
                }, function (tryAgain) {
                  if (tryAgain) {
                      App.load('write');
                  }
                });
               }

           else{


               var subject = new Array();
               var notes = new Array();
               var date = new Array();
               var time = new Array();

               var d = new Date();
               var today_date = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
               var today_time = d.getHours()+" : "+d.getMinutes();

               if(localStorage.getItem('subject') !== null){
                 subject = JSON.parse(localStorage.getItem('subject'));
               }


               if(localStorage.getItem('notes') !== null){
                 notes = JSON.parse(localStorage.getItem('notes'));
               }

               if(localStorage.getItem('date') !== null){
                date = JSON.parse(localStorage.getItem('date'));
               }

               if(localStorage.getItem('time') !== null){
                time = JSON.parse(localStorage.getItem('time'));
               }

               subject.push($('#subject').val());
               notes.push($("#content").val());
               date.push(today_date);
               time.push(today_time);
                
                localStorage.setItem('subject', JSON.stringify(subject));
                localStorage.setItem('notes' , JSON.stringify(notes));
                localStorage.setItem('date' , JSON.stringify(date));
                localStorage.setItem('time' , JSON.stringify(time));
             
         }

          App.load('home');
     
         });

      });



        App.controller('read' , function(page){
             
             var current_subject = JSON.parse(localStorage.getItem('subject'));
             var current_note = JSON.parse(localStorage.getItem('notes'));
             var current_date = JSON.parse(localStorage.getItem('date'));
             var current_time = JSON.parse(localStorage.getItem('time'));
             var index = parseInt(localStorage.getItem('current_note'));

             $(page).find('#current_subject').append(`<h2 style="text-align:center; color:#3e4240;"><b><i>${current_subject[index]}</i></b></h2>`) ;
             $(page).find('#current_note').append(`<p style="color:#3e4240;">${current_date[index]}<span style="float:right;">${current_time[index]}</span></p><br><h3 style="color:#3e4240;"><b><i>${current_note[index]}</i></b></h3>`) ;

             $(page).find("#delete").clickable().on('click' , function(){
                      
                      current_subject.splice(index , 1);
                      current_note.splice(index , 1);
                      current_date.splice(index , 1);
                      current_time.splice(index , 1);
                      localStorage.setItem('notes' , JSON.stringify(current_note));
                      localStorage.setItem('subject' , JSON.stringify(current_subject));
                      localStorage.setItem('date' , JSON.stringify(current_date));
                      localStorage.setItem('time' , JSON.stringify(current_time));

                      App.load('notes');

             });
      

        });






        App.controller('edit' , function(page){
        
             var current_subject = JSON.parse(localStorage.getItem('subject'));
             var current_note = JSON.parse(localStorage.getItem('notes'));
             var current_date = JSON.parse(localStorage.getItem('date'));
             var current_time = JSON.parse(localStorage.getItem('time'));
             var index = parseInt(localStorage.getItem('current_note'));
              
             $(page).find('#edit_subject').val(current_subject[index]);
             $(page).find('#edit_content').val(current_note[index]);

             $(page).find('#edit_note').clickable().on('click' , function(){
                
                  //EMPTY INPUT
                 if($('#edit_subject').val() == ''){
                        App.dialog({
                        title        : 'Please Enter The Subject',
                        text         : 'Subject Form Can not be Empty',
                        okButton     : 'Try Again',
                        cancelButton : 'Back'
                      }, function (tryAgain) {
                        if (tryAgain) {
                            App.load('edit');
                        }
                      });
                     }

                   else{
                   
                      //FIRST DELETE THE NOTE
                      current_subject.splice(index , 1);
                      current_note.splice(index , 1);
                      current_date.splice(index , 1);
                      current_time.splice(index , 1);

                      localStorage.setItem('notes' , JSON.stringify(current_note));
                      localStorage.setItem('subject' , JSON.stringify(current_subject));
                      localStorage.setItem('date' , JSON.stringify(current_date));
                      localStorage.setItem('time' , JSON.stringify(current_time));

                      //ADDING NEW VALUES
                       var subject = new Array();
                       var notes = new Array();
                       var date = new Array();
                       var time = new Array();

                        var d = new Date();
                         var today_date = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
                         var today_time = d.getHours()+" : "+d.getMinutes();

                       if(localStorage.getItem('subject') !== null){
                         subject = JSON.parse(localStorage.getItem('subject'));
                       }


                       if(localStorage.getItem('notes') !== null){
                         notes = JSON.parse(localStorage.getItem('notes'));
                       }

                       if(localStorage.getItem('time') !== null){
                         time = JSON.parse(localStorage.getItem('time'));
                       }


                       if(localStorage.getItem('date') !== null){
                         date = JSON.parse(localStorage.getItem('date'));
                       }


                       subject.push($('#edit_subject').val());
                       notes.push($("#edit_content").val());
                       date.push(today_date);
                       time.push(today_time);
                        
                        localStorage.setItem('subject', JSON.stringify(subject));
                        localStorage.setItem('notes' , JSON.stringify(notes));
                        localStorage.setItem('date', JSON.stringify(date));
                        localStorage.setItem('time' , JSON.stringify(time));

                   }


                   App.load('notes');  


             });

        });

    


      try {
        App.restore();
      } catch (err) {
        App.load('home');
      }