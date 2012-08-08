

import webapp2
from app.core.main import MainHandler, PageHandler, AjaxHandler
from app.core import admin

PAGE_RE = r'(/(?:[a-zA-Z0-9_-]+/?)*)'

app = webapp2.WSGIApplication([(r'/_admin', admin.AdminHandler),
							   (r"/_admin/editpage", admin.EditIndexHandler),
							   (r"/_admin/createpage", admin.CreatePageHandler),
							   (r'/ajax'+PAGE_RE, AjaxHandler),
							   (PAGE_RE, PageHandler)],
							   debug=True)
