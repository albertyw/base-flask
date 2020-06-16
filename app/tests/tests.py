import unittest

from varsnap import TestVarsnap  # noqa: F401

from app import serve


class PageCase(unittest.TestCase):
    def setUp(self) -> None:
        serve.app.config['TESTING'] = True
        self.app = serve.app.test_client()

    def test_index_load(self) -> None:
        self.page_test('/', b'')

    def test_robots_load(self) -> None:
        self.page_test('/robots.txt', b'')

    def test_sitemap_load(self) -> None:
        self.page_test('/sitemap.xml', b'')

    def test_not_found(self) -> None:
        response = self.app.get('/asdf')
        self.assertEqual(response.status_code, 404)
        self.assertIn(b'Not Found', response.get_data())

    def page_test(self, path: str, string: bytes) -> None:
        response = self.app.get(path)
        self.assertEqual(response.status_code, 200)
        self.assertIn(string, response.get_data())
