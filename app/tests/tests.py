from __future__ import absolute_import

import unittest

import serve


class PageCase(unittest.TestCase):
    def setUp(self):
        serve.app.config['TESTING'] = True
        self.app = serve.app.test_client()

    def test_index_load(self):
        self.page_test('/', b'')

    def test_robots_load(self):
        self.page_test('/robots.txt', b'')

    def test_sitemap_load(self):
        self.page_test('/sitemap.xml', b'')

    def page_test(self, path, string):
        response = self.app.get(path)
        self.assertEqual(response.status_code, 200)
        self.assertIn(string, response.get_data())
