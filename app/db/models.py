from google.appengine.ext import db


class Page(db.Model):
	url = db.StringProperty(required=True)
	title = db.StringProperty(required=True)
	head = db.StringProperty(multiline=True)
	content = db.StringProperty(multiline=True)
	created = db.DateTimeProperty(auto_now_add=True)
	edited = db.DateTimeProperty(auto_now=True)