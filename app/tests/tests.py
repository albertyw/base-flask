import unittest

from dotenv import dotenv_values
from varsnap import test

from app import serve


class PageCase(unittest.TestCase):
    def setUp(self) -> None:
        serve.app.config['TESTING'] = True
        self.app = serve.app.test_client()

    def test_index_load(self) -> None:
        self.page_test('/', b'')

    def test_robots_load(self) -> None:
        self.page_test('/robots.txt', b'')

    def test_security_load(self) -> None:
        self.page_test('/.well-known/security.txt', b'Contact')

    def test_humans_load(self) -> None:
        self.page_test('/humans.txt', b'albertyw')

    def test_health_load(self) -> None:
        self.page_test('/health', b'ok')

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
        response.close()


class TestIntegration(unittest.TestCase):
    def test_varsnap(self) -> None:
        config = dotenv_values('.env.production')
        serve.app.config['SERVER_NAME'] = config['SERVER_NAME']
        with serve.app.test_request_context(
            environ_overrides={'wsgi.url_scheme': 'https'},
        ):
            matches, logs = test()
        if matches is None:
            raise unittest.case.SkipTest('No Snaps found')  # pragma: no cover
        self.assertTrue(matches, logs)
