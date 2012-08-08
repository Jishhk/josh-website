import json
from app.handler.handler import Handler
from google.appengine.ext import db



class MainHandler(Handler):
    def get(self):
        self.render('base.html')


class PageHandler(Handler):
	def get(self, url):
		key = db.Key.from_path('Page', url)
		page = db.get(key)
		if page:
			self.render("page.html", page=page)
		else:
			self.error(404)


class AjaxHandler(Handler):
	def post(self, url):
		key = db.Key.from_path('Page', url)
		page = db.get(key)
		if page:
			page_data = {"content": page.content, "title": page.title, "valid": 1}
			self.write(json.dumps(page_data))
		else:
			self.write(json.dumps({"valid":0}))