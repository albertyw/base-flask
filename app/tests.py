from __future__ import absolute_import

import unittest

import serve


class PageCase(unittest.TestCase):
    def setUp(self):
        serve.app.config['TESTING'] = True
        self.app = serve.app.test_client()

    def test_index_load(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_robots_load(self):
        response = self.app.get('/robots.txt')
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
