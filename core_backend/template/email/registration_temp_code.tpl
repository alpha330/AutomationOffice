{% extends "mail_templated/base.tpl" %}

{% block subject %}
کد موقت 
{% endblock %}

{% block html %}
<p><h2>کد موقت مدت زمان 5 دقیقه</h2></p>
<br>
<p>{{temp_code}}</p>
{% endblock %}