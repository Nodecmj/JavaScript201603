~function (){
    /*
    *   ��̬������
    * */
    var inner = document.getElementById('inner');
    var tips = document.getElementById('tips');
    var imgList = inner.getElementsByTagName('img');
    var jsonData = null;

    !function dataBind(){
        var xhr = new XMLHttpRequest();
        xhr.open('get','banner.txt?_='+Math.random()+"&haha=123",false);
        xhr.onreadystatechange = function (){
            if(xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
                jsonData = utils.jsonParse(xhr.responseText);
            }
        }
        xhr.send(null);
        //�Ѿ��ɹ���ȡ������ ������Ҫʵ�ֶ�̬���ݰ�s
        var str = '';
        for(var i=0; i<jsonData.length; i++){
            var cur = jsonData[i];
            str += '<div><img src="" trueSrc="'+ cur.img +'"  /></div>';
        }
        inner.innerHTML = str;
        /*console.log(jsonData.length);*/
        utils.setCss(inner,'width',jsonData.length*1000); //inner�Ŀ�Ȳ���д���ˣ��ж��������ݾͻ��ж��
        str = ""; //�һ�����str������һ��str�Ѿ�����ֵΪinner��html�ˡ����������õ�ʱ����Ҫ���
        for(var j = 0; j<jsonData.length; j++){
            if(j === 0){ //���ڵ�һ��li��Ĭ����ʽ������Ҫ��һ���ж�
                str += '<li class="selected"></li>';
            }else{
                str += '<li></li>';
            }
        }
        tips.innerHTML = str;
    }();

    //ʵ��ͼƬ�ӳټ���
    function imgDelay(){
        for(var i=0; i<imgList.length; i++){
            !function (i){ //��������к��������ıհ���������������ÿ��i��ֵ
                var curImg = imgList[i]; //ÿһ����ʵ���ڵ�ͼƬ
                if(curImg.isLoad) return; //������ع��Ͳ�Ҫ������
                var tempImg = new Image();
                tempImg.src = curImg.getAttribute('trueSrc');
                tempImg.onload = function (){
                    //ͼƬ�Ѿ�����ʱ��img��ǩ����سɹ�
                    curImg.src = this.src;
                    curImg.style.display = 'block';
                    //����͸����
                    zhufengAnimate(curImg,{opacity:1},500);
                    tempImg = null;
                }
                curImg.isLoad = true;
            }(i);
        }
    }
    window.setTimeout(imgDelay,1000);






}();
