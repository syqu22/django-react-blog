from rest_framework.test import APITestCase
from users.models import User


class TestModels(APITestCase):

    def test_user_model(self):
        """ 
        New User does not change instance and is saved to Database
        """

        user = User.objects.create_user(
            username='test', email='test@test.com', password='testpassword')

        self.assertIsInstance(user, User)
        self.assertEqual(User.objects.first(), user)
        self.assertFalse(User.objects.first().is_superuser)
        self.assertFalse(User.objects.first().is_staff)

    def test_user_model_as_superuser(self):
        """ 
        New User does not change instance and is saved to Database as a superuser
        """

        user = User.objects.create_superuser(
            username='test', email='test@test.com', password='testpassword')

        self.assertIsInstance(user, User)
        self.assertEqual(User.objects.first(), user)
        self.assertTrue(User.objects.first().is_superuser)
        self.assertTrue(User.objects.first().is_staff)
