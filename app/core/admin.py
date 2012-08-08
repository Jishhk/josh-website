from app.handler.handler import Handler
from app.db.models import Page

class AdminHandler(Handler):
	def get(self):
		self.render("admin.html")


class EditIndexHandler(Handler):	
	def get(self):
		self.write("This page will list pages that can be edited")


class CreatePageHandler(Handler):
	def write_form(self, url='', title='', content='', head=''):
		self.render("edit.html", url=url, title=title, content=content, head=head)

	def get(self):
		self.write_form()


	def post(self):
		title = self.request.get("title")
		url = self.request.get("url")
		content = self.request.get("content")

		page = Page(title=title, url=url, content=content, key_name=url)
		page.put()

		self.redirect(url)