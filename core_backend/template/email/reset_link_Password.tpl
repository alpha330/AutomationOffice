{% extends "mail_templated/base.tpl" %}

{% block subject %}
کد تایید ثبت نام 
{% endblock %}

{% block html %}
<p><a href="http://127.0.0.1:8000/accounting/api/v1/reset-password/{{token}}/"><h2 >کد موقت برای فعالسازی اکانت</h2></a></p>
<p></p>
<br>
{% endblock %}