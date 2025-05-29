{% extends "mail_templated/base.tpl" %}

{% block subject %}
کد تایید ثبت نام 
{% endblock %}

{% block html %}
<p><h2>کد موقت برای فعالسازی اکانت</h2></p>
<br>
<p>{{temp_code}}</p>
<h4>مدت زمان 5 دقیقه</h4>
{% endblock %}