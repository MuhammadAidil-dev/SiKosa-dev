import CONFIG from "../config/config";
import { getAccessToken } from "./utils";

const handleExpiredSession = () => {
  localStorage.removeItem("authUser");
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
};

const fetchWithAuth = async (url, options = {}) => {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("Invalid access token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    handleExpiredSession();
    throw new Error("Sesi habis, silakan login kembali");
  }

  return response;
};

const updateProfile = async (formData) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/user/profile`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    const result = await response.json();
    return { error: false, message: result.message, data: result.data };
  } catch (error) {
    return { error: true, message: error.message, data: null };
  }
};

const updateProfilePsikolog = async (formData) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/psikolog/profile`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    const result = await response.json();
    return { error: false, message: result.message, data: result.data };
  } catch (error) {
    return { error: true, message: error.message, data: null };
  }
};

const getAllPsikolog = async () => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/user/psikolog/all`);
    if (!response.ok) {
      throw new Error("Failed to get psikologs");
    }
    const result = await response.json();
    if (result.data) {
      return { error: false, psikologs: result.data };
    }
  } catch (error) {
    return { error: true, psikologs: null };
  }
};

const getAllPsikologPublic = async () => {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/public/psikolog/all`);
    if (!response.ok) {
      throw new Error("Failed to get psikologs");
    }
    const result = await response.json();
    if (result.data) {
      return { error: false, psikologs: result.data };
    }
    return { error: true, psikologs: null };
  } catch (error) {
    return { error: true, psikologs: null };
  }
};

const getPsikologById = async (psikologId) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/user/psikolog/${psikologId}`);
    if (!response.ok) {
      throw new Error("Failed to get detail psikolog");
    }
    const result = await response.json();
    return { error: false, message: result.message, data: result.data };
  } catch (error) {
    return { error: true, message: error.message, data: null };
  }
};

const getPsikologByIdPublic = async (psikologId) => {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/public/psikolog/${psikologId}`);
    if (!response.ok) {
      throw new Error("Failed to get detail psikolog");
    }
    const result = await response.json();
    return { error: false, message: result.message, data: result.data };
  } catch (error) {
    return { error: true, message: error.message, data: null };
  }
};

const getArticles = async () => {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/articles/all`);
    if (!response.ok) {
      throw new Error("Failed to get articles");
    }
    const result = await response.json();
    return { error: false, message: result.message, articles: result.data };
  } catch (error) {
    return { error: true, message: error.message, articles: null };
  }
};

const getArticlesByWriter = async (writerId) => {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/articles/all`);
    if (!response.ok) {
      throw new Error("Failed to get articles");
    }
    const result = await response.json();
    const articlesFilter = result.data.filter((article) => article.writer._id === writerId);
    return { error: false, message: result.message, articles: articlesFilter };
  } catch (error) {
    return { error: true, message: error.message, articles: null };
  }
};

const getArticleBySlug = async (slug) => {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/articles/slug/${slug}`);
    if (!response.ok) {
      throw new Error("Failed to get articles");
    }
    const result = await response.json();
    return { error: false, message: result.message, article: result.data };
  } catch (error) {
    return { error: true, message: error.message, article: null };
  }
};

const createArticle = async (formData) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/psikolog/articles`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to create article");
    }
    const result = await response.json();
    return { error: false, message: result.message, data: result.data };
  } catch (error) {
    return { error: true, message: error.message, data: null };
  }
};

const editArticle = async (formData, articleId) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/psikolog/articles/${articleId}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update article");
    }
    const result = await response.json();
    return { error: false, message: result.message, data: result.data };
  } catch (error) {
    return { error: true, message: error.message, data: null };
  }
};

const deleteArticle = async (articleId) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/psikolog/articles/${articleId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete article");
    }
    const result = await response.json();
    return { error: false, message: result.message };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const getAllUsers = async () => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/admin/users/all`);
    if (!response.ok) {
      throw new Error("Failed to get all users");
    }
    const result = await response.json();
    return { error: false, message: result.message, users: result.data };
  } catch (error) {
    return { error: true, message: error.message, users: null };
  }
};

const deleteUserById = async (userId) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/admin/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    const result = await response.json();
    return { error: false, message: result.message };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const createUser = async (dataUser) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUser),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    const result = await response.json();
    return { error: false, message: result.message };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const getUserById = async (idUser) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/admin/users/${idUser}`);
    if (!response.ok) {
      throw new Error("Failed to get user");
    }
    const result = await response.json();
    return { error: false, message: result.message, user: result.data };
  } catch (error) {
    return { error: true, message: error.message, user: null };
  }
};

const AdminUpdateUser = async (data, idUser) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/admin/users/${idUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    const result = await response.json();
    return { error: false, message: result.message, user: result.data };
  } catch (error) {
    return { error: true, message: error.message, user: null };
  }
};

const AdminGetArticles = async () => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/admin/articles`);
    if (!response.ok) {
      throw new Error("Failed to get articles");
    }
    const result = await response.json();
    return { error: false, message: result.message, articles: result.data };
  } catch (error) {
    return { error: true, message: error.message, articles: null };
  }
};

const AdmincreateArticle = async (formData) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/admin/articles`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to create article");
    }
    const result = await response.json();
    return { error: false, message: result.message, data: result.data };
  } catch (error) {
    return { error: true, message: error.message, data: null };
  }
};

const AdminDeleteArticle = async (articleId) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/admin/articles/${articleId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete article");
    }
    const result = await response.json();
    return { error: false, message: result.message };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const AdminEditArticle = async (formData, articleId) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/admin/articles/${articleId}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update article");
    }
    const result = await response.json();
    return { error: false, message: result.message, data: result.data };
  } catch (error) {
    return { error: true, message: error.message, data: null };
  }
};

const getArticleById = async (idArticle) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/admin/articles/${idArticle}`);
    if (!response.ok) {
      throw new Error("Failed to get articles");
    }
    const result = await response.json();
    return { error: false, message: result.message, article: result.data };
  } catch (error) {
    return { error: true, message: error.message, article: null };
  }
};

const createPengajuanKonsultasi = async ({ message, psychologistId }) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/consultation/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, psychologistId }),
    });
    if (!response.ok) {
      throw new Error("Gagal melakukan pengajuan konsultasi");
    }
    const result = await response.json();
    return { error: false, message: result.message, data: result.data };
  } catch (error) {
    return { error: true, message: error.message, data: null };
  }
};

const getNotifications = async () => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/psikolog/notifications`);
    if (!response.ok) {
      throw new Error("Gagal mengambil notifications");
    }
    const result = await response.json();
    return { error: false, message: result.message, notifications: result.data };
  } catch (error) {
    return { error: true, message: error.message, notifications: null };
  }
};

const psikologHandleConcultationRequest = async (consultationId, status) => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/consultation/${consultationId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    });
    if (!response.ok) {
      throw new Error("Failed to update consultation request");
    }
    const result = await response.json();
    return { error: false, message: result.message, data: result.data };
  } catch (error) {
    return { error: true, message: error.message, data: null };
  }
};

const getHistoryConsultations = async () => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/user/consultation/history`);
    if (!response.ok) {
      throw new Error("Failed to get consultation history");
    }
    const result = await response.json();
    return { error: false, message: result.message, consultations: result.data };
  } catch (error) {
    return { error: true, message: error.message, consultations: null };
  }
};

const adminGetConsultations = async () => {
  try {
    const response = await fetchWithAuth(`${CONFIG.BASE_URL}/admin/consultation/all`);
    if (!response.ok) {
      throw new Error("Failed to get consultation history");
    }
    const result = await response.json();
    return { error: false, message: result.message, consultations: result.data };
  } catch (error) {
    return { error: true, message: error.message, consultations: null };
  }
};

export {
  updateProfile,
  getAllPsikolog,
  getAllPsikologPublic,
  getPsikologById,
  getPsikologByIdPublic,
  updateProfilePsikolog,
  getArticles,
  getArticlesByWriter,
  createArticle,
  deleteArticle,
  getArticleBySlug,
  editArticle,
  getAllUsers,
  deleteUserById,
  createUser,
  getUserById,
  AdminUpdateUser,
  AdminGetArticles,
  AdmincreateArticle,
  AdminDeleteArticle,
  AdminEditArticle,
  getArticleById,
  createPengajuanKonsultasi,
  getNotifications,
  psikologHandleConcultationRequest,
  getHistoryConsultations,
  adminGetConsultations,
};
